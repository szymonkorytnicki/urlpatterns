import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./Dropdown.module.css";

export const Root = RadixDropdownMenu.Root;
export const Portal = RadixDropdownMenu.Portal;

export const Trigger = (props) => {
  return <RadixDropdownMenu.Trigger className={styles.trigger} {...props} />;
};

export const Content = (props) => {
  return <RadixDropdownMenu.Content className={styles.content} {...props} />;
};
export const Label = (props) => {
  return <RadixDropdownMenu.Label className={styles.label} {...props} />;
};

export const Item = (props) => {
  return <RadixDropdownMenu.Item className={styles.item} {...props} />;
};

export const ItemContent = (props) => {
  return <div className={styles.itemContent} {...props} />;
};
