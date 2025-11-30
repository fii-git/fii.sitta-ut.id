const template = await fetch("../template/app-modal.html").then(r => r.text());

export default {
  template,

  data() {
    return {
      show: false,
      data: {}
    };
  },

  methods: {
    open(item) {
      this.data = { ...item };
      this.show = true;
    },

    close() {
      this.show = false;
    },

    save() {
      // kirim data hasil edit ke parent (app.js)
      this.$emit("save", this.data);
      this.close();
    }
  }
};
