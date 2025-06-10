<script setup lang="ts">
import AdminSidebar from "~/components/shared/layout/admin/AdminSidebar.vue";
import BottomBar from "~/components/shared/layout/BottomBar.vue";

const pageName = computed(() => useRoute().meta.displayName ?? "Dashboard");
</script>

<template>
  <div data-layout="admin">
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset>
        <div class="flex flex-col min-h-dvh">
          <header class="h-16 flex items-center px-4 border-b sticky top-0 bg-background">
            <div class="flex items-center gap-2">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                class="!h-6 mr-2"
              />
              <p>{{ pageName }}</p>
            </div>
          </header>

          <div class="flex-1 min-h-[200dvh] p-4">
            <NuxtPage />
          </div>

          <BottomBar />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
