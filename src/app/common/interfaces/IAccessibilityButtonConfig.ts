import { AccessibilityButtonEnum } from '../enums/AccessibilityButton.enum';

export interface IAccessibilityButtonConfig {
  name: AccessibilityButtonEnum;
  title: string;
  icon: string;
  backgroundColor: string;
  color: string | null;
  selected?: boolean;
}
