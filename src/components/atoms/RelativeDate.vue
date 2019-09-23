<template>
  <div>{{ relativeDateTime }}</div>
</template>

<script>
import { formatDistanceToNow } from "date-fns";
export default {
  props: ["moment"],
  data() {
    return {
      relativeDateTime: ""
    };
  },
  created() {
    this.refreshRelativeDateTime();
    setInterval(this.refreshRelativeDateTime, 1000);
  },
  methods: {
    refreshRelativeDateTime() {
      this.relativeDateTime = formatDistanceToNow(this.moment);
    }
  }
};
</script>