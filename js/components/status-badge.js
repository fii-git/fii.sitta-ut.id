const template = await fetch("../template/status-badge.html").then(r => r.text());

export default {
  template,
  props: ["status"]
};
