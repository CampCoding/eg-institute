/**
 * يحدد نوع الـ icon اللي جاي من السيرفر
 */
export const detectIconType = (value) => {
    if (!value || typeof value !== "string") return "lucide";

    const trimmed = value.trim();

    // SVG code (يبدأ بـ <svg)
    if (trimmed.startsWith("<svg")) return "svg-code";

    // URL لصورة (http/https أو يبدأ بـ /)
    if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("/")
    ) {
        return "image-url";
    }

    // Data URL (base64)
    if (trimmed.startsWith("data:image")) return "image-url";

    // أي حاجة تانية = lucide icon name
    return "lucide";
};