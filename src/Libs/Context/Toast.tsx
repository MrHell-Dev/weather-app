'use client';

import { createContext, useMemo, useState } from 'react';

interface ToastConfig {
    label?: string;
}
export const ToastContext = createContext<{
    toast?: ToastConfig;
    setToast: (a: ToastConfig) => void;
}>({
    setToast: () => null,
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastConfig>();
    const valueToPass = useMemo(() => {
        return { toast, setToast };
    }, [toast]);
    return (
        <ToastContext.Provider value={valueToPass}>
            {children}
        </ToastContext.Provider>
    );
};
