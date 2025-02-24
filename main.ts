import { createApp } from "vue";
import Directory from "./components/Directory.vue";
import Feed from "./components/Feed.vue";
import Profile from "./components/Profile.vue";
import Navigation from "./components/Navigation.vue";
import { GraffitiPlugin } from "@graffiti-garden/wrapper-vue";
import { GraffitiRemote } from "@graffiti-garden/implementation-remote";
import VueClickAway from "vue3-click-away";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";

const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  history.replaceState(null, "", redirect);
}

const routes = [
  {
    path: "/",
    component: Feed,
  },
  {
    path: "/directory",
    component: Directory,
  },
  {
    path: "/profile/:actorEncoded",
    props: true,
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(Navigation)
  .use(router)
  .use(GraffitiPlugin, {
    graffiti: new GraffitiRemote(),
  })
  .use(VueClickAway)
  .directive("focus", { mounted: (el: HTMLElement) => el.focus() })
  .mount("#app");
