export type TagItem = {
  code: string;

  label: {
    // zh_CN: string;
    fa_IR: string;
    en_US: string;
  };

  /** tag's route path */
  path: string;

  /** can be closed ? */
  closable: boolean;
};

export interface TagState {
  /** tagsView list */
  tags: TagItem[];

  /**current tagView id */
  activeTagId: TagItem['path'];
}
