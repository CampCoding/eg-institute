"use client";
import React from "react";
import { detectIconType } from "@/libs/shared/iconHelpers";
import { getIcon } from "@/libs/shared/aboutIconsMap";

/**
 * Smart Icon Renderer
 * 
 * يدعم:
 * - SVG code من السيرفر
 * - Image URL (jpg, png, svg, webp)
 * - Lucide icon name (string)
 * 
 * @param {string} icon - القيمة الجاية من السيرفر
 * @param {string} className - classes للـ wrapper (للـ size والـ color)
 * @param {string} imgClassName - classes للـ image (لو URL)
 * @param {string} alt - alt للصورة
 */
const SmartIcon = ({
    icon,
    className = "w-5 h-5",
    imgClassName = "w-full h-full object-contain",
    alt = "icon",
    ...props
}) => {
    if (!icon) {
        const FallbackIcon = getIcon("default");
        return <FallbackIcon className={className} {...props} />;
    }

    const type = detectIconType(icon);

    // SVG code من السيرفر
    if (type === "svg-code") {
        return (
            <span
                className={`inline-flex items-center justify-center ${className}`}
                dangerouslySetInnerHTML={{ __html: icon }}
            />
        );
    }

    // Image URL
    if (type === "image-url") {
        return (
            <span className={`inline-flex items-center justify-center ${className}`}>
                <img src={icon} alt={alt} className={imgClassName} />
            </span>
        );
    }

    // Lucide icon (من الـ map)
    const LucideIcon = getIcon(icon);
    return <LucideIcon className={className} {...props} />;
};

export default SmartIcon;