"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeGrpcClient } from "../lib/grpcClient";

interface DexHandContextProps {
  isGrpcInitialized: boolean;
  initialize: () => void;
}

const DexHandContext = createContext<DexHandContextProps | undefined>(
  undefined
);

export const DexHandProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isGrpcInitialized, setIsGrpcInitialized] = useState(false);

  const initialize = () => {
    initializeGrpcClient();
    setIsGrpcInitialized(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  const value: DexHandContextProps = {
    isGrpcInitialized,
    initialize,
  };

  return (
    <DexHandContext.Provider value={value}>{children}</DexHandContext.Provider>
  );
};

export const useDexHand = () => {
  const context = useContext(DexHandContext);
  if (!context) {
    throw new Error("useDexHand must be used within a DexHandProvider");
  }
  return context;
};
