import { Client, GuildMember } from 'discord.js';
import colors from 'colors';

export async function transmitirMensagem(cliente: Client, conteudoDaMensagem: string) {
  const guilda = cliente.guilds.cache.first();
  if (!guilda) return;

  const membros = await guilda.members.fetch();
  let contador = 0;

  const membrosHumanos = Array.from(membros.values()).filter((membro: GuildMember) => {
    return !membro.user.bot && membro.user.id !== cliente.user?.id;
  });

  membrosHumanos.forEach((membro: GuildMember, indice: number) => {
    setTimeout(() => {
      membro.send(conteudoDaMensagem)
        .then(() => {
          contador++;
          console.log(colors.green(`[+] Mensagem enviada para ${membro.user.tag} ✅`));

          if (contador === membrosHumanos.length) {
            console.log(colors.rainbow(`\n[Finalizado] - Total de membros que receberam a mensagem: ${contador}`));
          }
        })
        .catch(err => console.log(colors.red(`Erro ao enviar uma mensagem para ${membro.user.tag}: ${err.message}`)));
    }, indice * 3000); // 3 segundos para evitar que o bot seja bloqueado pelo Discord
  });
}