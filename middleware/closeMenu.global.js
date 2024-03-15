export default defineNuxtRouteMiddleware((to, from) => {
    const showMobMenu = useShowMobMenu()
    if (showMobMenu.value) {
        showMobMenu.value = false
        return
    }
})