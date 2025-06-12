export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.includes("/project") || !to.path.includes("/admin")) return;

  const id = to.params.projectId;
  if (!id) return;

  const store = useProjectsStore();
  const { selectedProject } = storeToRefs(store);

  if (selectedProject.value?.id === Number(id)) return;
  await store.selectProject(Number(id));

  if (!selectedProject.value) return abortNavigation();
});
