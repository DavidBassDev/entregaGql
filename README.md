Hola, este es el taller GRAPHQL.
Desarrolle este taller, tomando como ejemplo real el funcionamiento de mi empresa Inmel ingenieria, que tiene varios vehiculos vinculados a diferentes clientes llamados "centros de operacion".
El area de flota, utiliza los rendimientos teoricos de cada vehiculo, los galones consumidos y la distancia recorrida para saber si el vehiculo esta por debajo del rendimiento esperado.
Para ello defino estos dos conceptos clave
* Rendimiento Teorico = es el rendimiento (KILOMETROS POR GALON) que recorre el vehiculo, esta informacion esta disponible en las fichas tecnicas de cada vehiculo
* Rendimiento = es el rendimiento alcanzado segun la distancia recorrida y los galones consumidos
* Eficiencia = es la comparacion del rendimiento obtenido, comparado con el rendimiento teorico. Si un vehiculo debe rendir 32 km/gal y el vehiculo tuvo un rendimiento de 11km/gal
  entonces su eficiencia es del 50%, es decir, este vehiculo cumplio con la mitad del rendimiento que el fabricante indica puede alcanzar. Tener una eficiencia inferior al 80% signigica
  directamente robo de combustible o que el vehiculo tiene problemas mecanicos, relacionados al sistema de combustible, que perjudican su rendimiento teorico.

1. ¿que hace?
   R:/ Permite calcular el rendimiento de un combustible, segun el rendimiento teorico y permite visualizar los centros de operacion al que el vehiculo pertenece (clientes)
2. ¿como ejecutarlo?
   R:/ Esta en el puerto 4001, porque el 4000 lo tengo ocupado en otra actividad de otra materia. Es importante ubicarse en la carpeta be_grahpql y ejecutar el comando
   npm run dev para iniciar la app y levantar el docker.

3. ¿Como interactuar con los metodos?
    R:/ Se puede usar el playground para validar los CRUD y usar el HTML para loguearse e interactuar con las reglas de negocio, se puede usar este usuario y contraseña:
   email: "l.bohorquez@correo.com",
    password: "password123"

   al iniciar sesion, encontraremos vehiculos, tipos de vehiculos, la calculadora para calcular el rendimiento de combustible (ingresar km recorrido y galones consumidos)
   tambien podremos ver los centros de operacion (clientes), y utilizando AXIO y un mock propio, cree unos tips de conduccion, que funcionan al presionar el boton ver tips de conduccion
