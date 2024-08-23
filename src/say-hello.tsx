import { Form, ActionPanel, Action, Icon, getPreferenceValues } from "@raycast/api";
import { WebClient } from "@slack/web-api";

interface Preferences {
  slackToken: string;
  slackChannel: string;
}

export default function Command() {
  return (
    <Form
      actions={
        <ActionPanel>
          <TestAction />
        </ActionPanel>
      }
    >
      <Form.TextArea id="message" title="Message" placeholder="Enter message" />
    </Form>
  );
}

function TestAction() {
  async function handleSubmit(values: { message: string }) {
    const preferences = getPreferenceValues<Preferences>();

    const token = preferences.slackToken;
    const channel = preferences.slackChannel;

    const message = values.message;
    const web = new WebClient(token);

    await web.chat.postMessage({
      text: message,
      channel,
    });
  }
  return <Action.SubmitForm icon={Icon.Upload} title="Post Slack" onSubmit={handleSubmit} />;
}
