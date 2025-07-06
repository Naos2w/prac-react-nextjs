"use client";
import { useMemo } from "react";

/**
 * 產生指定數量的柔和不重複顏色（HSL格式）
 * @param count 顏色數量
 * @returns 顏色陣列
 */
export const useSoftUniqueColors = (count: number): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i);
    const saturation = 60 + Math.random() * 15;
    const lightness = 60 + Math.random() * 15;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};

export default useSoftUniqueColors;
