import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Toaster } from "sonner";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell } from "@/components/layout/AppShell";
import { LangSync } from "@/components/layout/LanguageToggle";
import { AuthProvider } from "@/lib/auth/provider";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import appCss from "../styles.css?url";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 20_000, retry: 1 } },
});

const fetchSessionUser = createServerFn({ method: "GET" }).handler(async () => {
  const { getSessionUser } = await import("@/lib/auth/verify.server");
  const u = await getSessionUser();
  return u ? { id: u.id, email: u.email } : null;
});

export const Route = createRootRoute({
  beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${APP_NAME} · ${APP_TAGLINE}` },
      { name: "description", content: "面向中国农民的土壤科普：拍照诊断、知识库与问答。" },
      { name: "robots", content: "index,follow" },
      { name: "theme-color", content: "#1F6B4A" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang="zh-CN" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <LangSync />
            <AppShell>
              <Outlet />
            </AppShell>
            <Toaster position="top-center" richColors />
          </QueryClientProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
