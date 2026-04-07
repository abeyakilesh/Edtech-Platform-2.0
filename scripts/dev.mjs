import { spawn } from "node:child_process";

const processes = [
  {
    name: "server",
    color: "\x1b[36m",
    command: "npm",
    args: ["run", "dev", "--workspace", "backend"],
  },
  {
    name: "client",
    color: "\x1b[35m",
    command: "npm",
    args: ["run", "dev", "--workspace", "frontend"],
  },
];

const children = processes.map(({ name, color, command, args }) => {
  const child = spawn(command, args, {
    stdio: ["inherit", "pipe", "pipe"],
    shell: true,
  });

  const prefix = `${color}[${name}]\x1b[0m`;
  child.stdout.on("data", (chunk) => process.stdout.write(`${prefix} ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`${prefix} ${chunk}`));

  return child;
});

const shutdown = () => {
  children.forEach((child) => child.kill("SIGINT"));
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
