export default {
  shareWith: {
    type: "shareWith",
    title: "Share with ...",
    default: { text: "Worldwide", value: "worldwide" },
    options: [
      { text: "In my City", value: "city" },
      { text: "In my State", value: "state" },
      { text: "In my Country", value: "country" },
      { text: "Worldwide", value: "worldwide" },
    ],
  },
  expires: {
    type: "expires",
    title: "For how long do you want to keep your post?",
    default: { text: "Forever", value: "forever" },
    options: [
      { text: "Forever", value: "forever" },
      { text: "For a month", value: "month" },
      { text: "For a week", value: "week" },
      { text: "For a day", value: "day" },
    ],
  },
  helpTypes: {
    type: "helpTypes",
    title: "",
    default: { text: "", value: "" },
    options: [
      { text: "Looking for help", value: "request" },
      { text: "Offering to help", value: "offer" },
    ],
  },
};
