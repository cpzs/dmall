import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config';
import { transmitirMensagem } from './utils/enviarMensagem';
import readlineSync from 'readline-sync';
import colors from 'colors';

const cliente = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

cliente.once('ready', () => {
  console.log(colors.blue(`Bot conectado ao ${cliente.user?.tag} ✅`));
  console.clear();

  const mensagemParaEnviar = readlineSync.question(colors.yellow('\nQue mensagem voce deseja enviar a todos os membros do servidor?\n   >> '));

  transmitirMensagem(cliente, mensagemParaEnviar)
    .then(() => {
      console.log(colors.yellow('\nMensagens enviadas a todos os membros.. ⏳'));
    })
    .catch((err) => {
      console.error(colors.red(err));
    });
});

cliente.login(config.token);