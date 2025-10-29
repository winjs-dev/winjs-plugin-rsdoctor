import type { IApi } from '@winner-fed/winjs';

export default (api: IApi) => {
  api.modifyHTML(($) => {
    return $;
  });
};
