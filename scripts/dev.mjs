import net from "net";
import { spawn } from "child_process";

function getAvailablePort(startPort = 3000) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(getAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });

    server.listen(startPort, () => {
      server.close(() => {
        resolve(startPort);
      });
    });
  });
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

