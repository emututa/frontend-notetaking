


import React, { createContext, useContext, useState, ReactNode } from "react";
import { checkPassword, setPassword, verifyPassword, changePassword } from "../lib/index";

// Types for API responses
interface CheckPasswordResponse {
  hasPassword: boolean;
}

interface VerifyPasswordResponse {
  success: boolean;
  message: string;
}

interface SecretsContextType {
  isUnlocked: boolean;
  hasPassword: boolean | null;
  unlock: (password: string) => Promise<boolean>;
  setNewPassword: (password: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  lock: () => void;
}

const SecretsContext = createContext<SecretsContextType | undefined>(undefined);

export const SecretsProvider = ({ children }: { children: ReactNode }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await checkPassword();
        const data = res.data as CheckPasswordResponse;
        setHasPassword(data.hasPassword);
      } catch (err) {
        console.error("Failed to check password", err);
      }
    })();
  }, []);

  const unlock = async (password: string) => {
    try {
      const res = await verifyPassword(password);
      const data = res.data as VerifyPasswordResponse;
      if (data.success) {
        setIsUnlocked(true);
        return true;
      }
    } catch (err) {
      console.error("Unlock failed:", err);
    }
    return false;
  };

  const setNewPasswordHandler = async (password: string) => {
    await setPassword(password);
    setHasPassword(true);
  };

  const updatePasswordHandler = async (oldPassword: string, newPassword: string) => {
    await changePassword(oldPassword, newPassword);
  };

  const lock = () => setIsUnlocked(false);

  return (
    <SecretsContext.Provider
      value={{
        isUnlocked,
        hasPassword,
        unlock,
        setNewPassword: setNewPasswordHandler,
        updatePassword: updatePasswordHandler,
        lock,
      }}
    >
      {children}
    </SecretsContext.Provider>
  );
};

export const useSecrets = () => {
  const ctx = useContext(SecretsContext);
  if (!ctx) throw new Error("useSecrets must be used inside SecretsProvider");
  return ctx;
};
