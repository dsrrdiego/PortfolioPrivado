const tagss = ['Angular', 'Cpp', 'Java ', 'JavaScript', 'SpringBoot','Python',"API", "SPA", "Flutter", "Juego", "Graficos", "Carrito", "3D", "front", "Sas","Bot"];
let tags = [];
for (const t of tagss) {
    const tag = {
        "nombre": t,
        "activo": false
    }
    tags.push(tag);

}