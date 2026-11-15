import net from "net";
import { spawn } from "child_process";

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, "0.0.0.0");
  });
}

async function getAvailablePort(startPort = 3000) {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    port++;
  }
  return port;
}

async function start() {
  const initialPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const port = await getAvailablePort(initialPort);

  console.log(`\n======================================================`);
  console.log(`[PORT] Puerto dinámico asignado: ${port}`);
  console.log(`[WEB]  Acceso a la aplicación: http://localhost:${port}`);
  console.log(`[AUTH] Panel de Administración: http://localhost:${port}/admin`);
  console.log(`======================================================\n`);

  const nextDev = spawn("npx", ["next", "dev", "-p", port.toString()], {
    stdio: "inherit",
    shell: true,
  });

  nextDev.on("exit", (code) => {
    process.exit(code || 0);
  });
}

start().catch((err) => {
  console.error("Error al buscar puerto dinámico:", err);
  process.exit(1);
});

