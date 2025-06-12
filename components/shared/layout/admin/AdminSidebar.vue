<script setup lang="ts">
import { SwatchBook, LayoutDashboard, LockKeyhole, type LucideIcon } from "lucide-vue-next";

interface Group {
  type: "group";
  label: string;
  children: Item[];
}
interface Item {
  type: "item";
  label: string;
  to: string;
  icon: LucideIcon;
  children?: SubItem[];
}
interface SubItem {
  label: string;
  to: string;
}

const navigation: (Group | Item)[] = [
  {
    type: "item",
    label: "dashboard",
    icon: LayoutDashboard,
    to: "/",
  },
  {
    type: "group",
    label: "interface",
    children: [
      {
        type: "item",
        label: "services",
        to: "/services",
        icon: SwatchBook,
      },
    ],
  },
];

const useAdminLink = (path: string) => `/admin/${useRoute().params.key}/${path.startsWith("/") ? path.substring(1) : path}`;
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader class="h-16">
      <div class="p-1.5 flex items-center gap-2 overflow-hidden">
        <LockKeyhole class="shrink-0 size-5" />
        <p class="text-muted-foreground font-semibold overflow-hidden">
          .admin()
        </p>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup
        v-for="group in navigation"
        :key="group.label"
      >
        <SidebarMenu v-if="group.type === 'item'">
          <SidebarMenuItem>
            <SidebarMenuButton as-child>
              <NuxtLinkLocale
                :to="useAdminLink(group.to)"
                active-class="!bg-sidebar-accent !text-sidebar-accent-foreground"
              >
                <component :is="group.icon" />
                {{ $t(`admin.navigation.${group.label}`) }}
              </NuxtLinkLocale>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu v-else-if="group.type === 'group'">
          <SidebarGroupLabel>
            {{ $t(`admin.navigation.${group.label}.DEFAULT`) }}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItem
              v-for="item in group.children"
              :key="item.label"
            >
              <SidebarMenuButton as-child>
                <NuxtLinkLocale
                  :to="useAdminLink(item.to)"
                  active-class="!bg-sidebar-accent !text-sidebar-accent-foreground"
                >
                  <component :is="item.icon" />
                  {{ $t(`admin.navigation.${group.label}.${item.label}`) }}
                </NuxtLinkLocale>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
