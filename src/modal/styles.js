export const styles = `
  #er_root * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  #er_backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,.5);
    z-index: 999999; display: flex; align-items: center; justify-content: center;
    animation: erfi .15s ease;
  }
  @keyframes erfi { from { opacity: 0 } to { opacity: 1 } }
  #er_panel {
    background: #fff; border-radius: 16px; width: 430px; max-width: calc(100vw - 20px);
    max-height: calc(100vh - 40px); overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0,0,0,.22);
    animation: ersi .2s cubic-bezier(.34,1.56,.64,1);
  }
  @keyframes ersi { from { transform: translateY(12px) scale(.96); opacity: 0 } to { transform: none; opacity: 1 } }
  #er_head { padding: 18px 18px 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
  #er_head h2 { font-size: 16px; font-weight: 700; color: #111; }
  #er_x {
    background: #f0f0f0; border: none; border-radius: 50%;
    width: 26px; height: 26px; cursor: pointer; font-size: 14px;
    display: flex; align-items: center; justify-content: center; color: #555; flex-shrink: 0;
  }
  #er_x:hover { background: #e4e4e4; }
  #er_body { padding: 14px 18px 20px; }
  .er_desc { font-size: 12.5px; color: #666; line-height: 1.6; margin-bottom: 12px; }
  .er_row {
    display: flex; align-items: center; gap: 9px;
    background: #f6f6f6; border-radius: 9px;
    padding: 9px 11px; margin-bottom: 7px;
  }
  .er_icon { font-size: 17px; flex-shrink: 0; }
  .er_lbl { font-size: 12.5px; font-weight: 600; color: #111; display: block; }
  .er_sub { font-size: 11px; color: #888; }
  .er_badge {
    margin-left: auto; font-size: 11px; font-weight: 700;
    padding: 2px 8px; border-radius: 20px;
    background: #ececec; color: #666; flex-shrink: 0;
  }
  .er_badge.warm { background: #fff0e0; color: #b84000; }
  .er_badge.red  { background: #fee; color: #c00; }
  .er_sep { height: 1px; background: #f0f0f0; margin: 12px 0; }
  .er_note_lbl { font-size: 11.5px; color: #777; display: block; margin-bottom: 5px; }
  #er_note {
    width: 100%; border: 1.5px solid #e4e4e4; border-radius: 8px;
    padding: 9px 11px; font-size: 12.5px; resize: vertical; min-height: 65px;
    outline: none; color: #111; background: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    transition: border-color .15s;
  }
  #er_note:focus { border-color: #aaa; }
  #er_prog_wrap { background: #f0f0f0; border-radius: 3px; height: 4px; overflow: hidden; margin: 12px 0 5px; display: none; }
  #er_pbar { height: 100%; width: 0%; background: #111; border-radius: 3px; transition: width .3s; }
  #er_status { font-size: 11px; color: #999; min-height: 14px; margin-bottom: 10px; display: none; }
  #er_submit {
    width: 100%; margin-top: 12px; padding: 11px;
    border: none; border-radius: 9px; background: #111; color: #fff;
    font-size: 13.5px; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    transition: opacity .15s;
  }
  #er_submit:hover:not(:disabled) { opacity: .86; }
  #er_submit:disabled { opacity: .4; cursor: not-allowed; }
  .er_ok { text-align: center; padding: 6px 0 4px; }
  .er_ok_icon { font-size: 42px; display: block; margin-bottom: 10px; }
  .er_ok_title { font-size: 16px; font-weight: 700; color: #111; margin-bottom: 7px; }
  .er_ok_desc { font-size: 12.5px; color: #666; line-height: 1.65; margin-bottom: 18px; }
  #er_done {
    width: 100%; padding: 10px; border: 1.5px solid #ddd; border-radius: 9px;
    background: transparent; font-size: 13.5px; font-weight: 600; cursor: pointer; color: #111;
  }
  #er_done:hover { background: #f6f6f6; }
`
