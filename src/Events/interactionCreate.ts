import Event from "../Structures/Event.js";
import {
  ActionRow,
  ActionRowBuilder,
  APIButtonComponentWithCustomId,
  ButtonBuilder,
  ButtonComponent,
  DiscordjsErrorCodes,
  EmbedBuilder,
  codeBlock,
} from "discord.js";
import { CalculatorActions, EmbedLimits } from "../types.js";
import { inspect } from "util";

export default new Event("interactionCreate", async (client, interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.run(interaction, client);
    } catch (error) {
      console.error(error);
      try {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } catch {
        if (error.code === DiscordjsErrorCodes.InteractionAlreadyReplied) {
          await interaction.editReply({
            content: "There was an error while executing this command!",
          });
        }
      }
    }
  } else if (interaction.isContextMenuCommand()) {
    const command = client.contextMenuCommands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.run(interaction, client);
    } catch (error) {
      console.error(error);
      try {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } catch {
        if (error.code === DiscordjsErrorCodes.InteractionAlreadyReplied) {
          await interaction.editReply({
            content: "There was an error while executing this command!",
          });
        }
      }
    }
  } else if (interaction.isMessageComponent()) {
    const { customId } = interaction;
    if (interaction.isButton()) {
      if (customId.startsWith("tic-tactoe:")) {
        if (!interaction.channel.isThread()) return;

        const startMessage = await interaction.channel.fetchStarterMessage();
        const ids = startMessage.content
          .match(/<@!?(?<id>\d{17,20})>/g)
          .map((id) => id.replace("<@", "").replace(">", ""));

        // Create ActionRowBuilders from the given ActionRows
        const rows = (
          interaction.message.components as ActionRow<ButtonComponent>[]
        ).map((row) => {
          return ActionRowBuilder.from(row) as ActionRowBuilder<ButtonBuilder>;
        });
        // Count the amount of empty spaces left
        const mappedRows = rows.map((row) => row.components);
        const amountOfSpacesLeft = [
          ...mappedRows[0],
          ...mappedRows[1],
          ...mappedRows[2],
        ]
          .map(
            (button) =>
              (button.toJSON() as APIButtonComponentWithCustomId).emoji.name
          )
          .filter((emoji) => emoji === "🟦")
          .reduce((acc, emoji) => acc + 1, 0);

        // Get whose turn it is supposed to be
        const nextEmoji = amountOfSpacesLeft % 2 === 0 ? "❌" : "🟢";

        if (nextEmoji === "🟢" && interaction.user.id !== ids[0]) {
          return await interaction.reply({
            content: "Wait your turn!",
            ephemeral: true,
          });
        } else if (nextEmoji === "❌" && interaction.user.id !== ids[1]) {
          return await interaction.reply({
            content: "Wait your turn!",
            ephemeral: true,
          });
        }
        // Update the clicked button
        const rowAndButton = customId.substring("tic-tactoe:".length);
        const rowIndex = Number(rowAndButton[0]);
        const buttonIndex = Number(rowAndButton[2]);
        rows[rowIndex].components[buttonIndex]
          .setDisabled(true)
          .setEmoji(nextEmoji);

        const checkButtonsEmojis = (buttons: Array<ButtonBuilder>) => {
          let xCount = 0;
          let oCount = 0;
          for (const button of buttons) {
            const emoji = (button.toJSON() as APIButtonComponentWithCustomId)
              .emoji.name;
            if (emoji === "❌") xCount++;
            else if (emoji === "🟢") oCount++;
          }
          if (xCount === 3) return "x";
          else if (oCount === 3) return "o";
          else return;
        };

        const disableButtons = () => {
          rows.forEach((row) => {
            row.components.forEach((button) => {
              button.setDisabled(true);
            });
          });
        };

        // Check if any of the rows contain a tic-tac-toe
        for (let i = 0; i <= 2; i++) {
          const row = rows[i];
          const { components: buttons } = row;
          let xCount = 0;
          let oCount = 0;
          if (checkButtonsEmojis(buttons)) {
            disableButtons();
            await interaction.update({ components: rows });
            await interaction.followUp({ content: `${nextEmoji} won!` });
            return await interaction.channel.setLocked();
          }
        }

        for (let i = 0; i <= 2; i++) {
          const buttons = [
            rows[0].components[i],
            rows[1].components[i],
            rows[2].components[i],
          ];
          if (checkButtonsEmojis(buttons)) {
            disableButtons();
            await interaction.update({ components: rows });
            await interaction.followUp({ content: `${nextEmoji} won!` });
            return await interaction.channel.setLocked();
          }
        }

        const buttonsLeftToRight = [
          rows[0].components[0],
          rows[1].components[1],
          rows[2].components[2],
        ];
        const buttonsRightToLeft = [
          rows[0].components[2],
          rows[1].components[1],
          rows[2].components[0],
        ];

        if (
          checkButtonsEmojis(buttonsLeftToRight) ||
          checkButtonsEmojis(buttonsRightToLeft)
        ) {
          disableButtons();
          await interaction.update({ components: rows });
          await interaction.followUp({ content: `${nextEmoji} won!` });
          return await interaction.channel.setLocked();
        }
        await interaction.update({ components: rows });
      } else if (customId.startsWith("calc-")) {
        const action = customId.substring("calc-".length) as CalculatorActions;
        if (action === "delmsg") {
          await interaction.update({ content: "\u200b", components: [] });
          await interaction.deleteReply().catch(console.error);
        } else if (action === "clear") {
          await interaction.update({
            content: "",
            components: interaction.message.components,
          });
        } else if (action === "=") {
          const { content: expression } = interaction.message;
          try {
            const result = eval(
              expression.replace(" ", "").replace("(", " * (")
            ).toString();
            await interaction.update({
              content: result,
            });
          } catch (error) {
            if (error instanceof SyntaxError) {
              await interaction.reply({
                content: "Invalid syntax!",
                ephemeral: true,
              });
            } else console.error(error);
          }
        } else if (
          ["/", "+", "-", "*"].includes(action) ||
          ["/", "+", "-", "*"].includes(
            interaction.message.content[interaction.message.content.length - 1]
          )
        ) {
          await interaction.update({
            content: `${interaction.message.content} ${action}`,
          });
        } else {
          await interaction.update({
            content: `${interaction.message.content}${action}`,
          });
        }
      }
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === "evalModal") {
      const i = interaction;
      await i.deferReply();
      const code = i.fields.getTextInputValue("codeInput");

      try {
        let evaled: string | any;
        if (code.includes("return")) {
          evaled = await eval(`async function a(){${code};}; a()`);
        } else {
          evaled = await eval(`async function a(){return ${code};}; a()`);
        }
        if (typeof evaled !== "string") {
          evaled = inspect(evaled);
        }

        if (evaled.length > EmbedLimits.FieldValue) {
          evaled =
            evaled.substring(
              0,
              EmbedLimits.FieldValue - "```js\\n```...".length
            ) + "...";
        }

        await i.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor("#36393e")
              .addFields(
                { name: "Input", value: codeBlock("js", code) },
                { name: "Output", value: codeBlock("js", evaled) }
              )
              .setFooter({
                text: `${client.user.username}`,
                iconURL: client.user.displayAvatarURL(),
              }),
          ],
        });
      } catch (error) {
        console.error(error);
        await i.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setDescription(
                `**Input:**\n${codeBlock("js", code)}\n**Output:**\n${codeBlock(
                  "ansi",
                  `\x1b[31;1m${error.message}`
                )}`
              ),
          ],
        });
      }
    }
  }
});
