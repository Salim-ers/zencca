/** Script exécuté avant la première peinture (chargement complet), ignoré par React côté client. */
export function InlineScript({ html, type = "text/javascript" }: { html: string; type?: string }) {
  return (
    <script
      type={typeof window === "undefined" ? type : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
