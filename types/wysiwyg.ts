import type { Translation } from "~/types/generics";
import type { ButtonVariants } from "~/components/ui/button";

export interface IMedia {
  mim: string;
  url: string;
  alt?: string;
}

export const WysiwygEntityTypes = [
  // Blocks
  "paragraph",
  "title",
  "image",
  "video",
  "quote",
  "compare",
  "button",
  // Layout
  "section",
  "separator",
] as const;
export type EWysiwygEntityType = typeof WysiwygEntityTypes[number];
export interface IWysiwygContentEntity {
  type: EWysiwygEntityType;
}
export interface IWysiwygContent {
  options: {
    fullWidth: boolean;
  };
  blocks: IWysiwygContentEntity[];
}

// Blocs
export interface IWysiwygParagraph extends IWysiwygContentEntity {
  type: "paragraph";
  content: Translation;
}
export interface IWysiwygTitle extends IWysiwygContentEntity {
  type: "title";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: Translation;
}
export interface IWysiwygMedia extends IWysiwygContentEntity {
  type: "image" | "video";
  data: IMedia;
}
export interface IWysiwygQuote extends IWysiwygContentEntity {
  type: "quote";
  content: string;
  author?: string;
}
export interface IWysiwygCompare extends IWysiwygContentEntity {
  type: "compare";
  images: {
    left: IMedia;
    right: IMedia;
  };
}
export interface IWysiwygButton extends IWysiwygContentEntity {
  type: "button";
  target: "_self" | "_blank";
  url: string;
  label: string;
  variant: ButtonVariants["variant"];
  side: "left" | "center" | "right" | "full";
  icon?: {
    name: string;
    side: "left" | "right";
  };
}

export type IWysiwygStackable =
  | IWysiwygTitle
  | IWysiwygParagraph
  | IWysiwygMedia
  | IWysiwygQuote
  | IWysiwygCompare
  | IWysiwygButton
  // Exception
  | IWysiwygSection
  | IWysiwygSeparator
  ;

// Layout
export interface IWysiwygSection extends IWysiwygContentEntity {
  type: "section";
  children: IWysiwygStackable[];
}
export interface IWysiwygSeparator extends IWysiwygContentEntity {
  type: "separator";
  orientation: "vertical" | "horizontal";
}
