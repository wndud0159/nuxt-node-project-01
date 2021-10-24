export default function({ $axios }, inject) {
    if (process.browser) {
        const token = localStorage.getItem("token");
        const api = $axios.create({
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        api.setBaseURL("http://localhost:8080");

        inject("api", api);
    }
}
