"use client";

import { type ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

interface ProvidersProps {
children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	return <CookiesProvider>{children}</CookiesProvider>;
}
