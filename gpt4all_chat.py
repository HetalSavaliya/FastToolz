import sys
from gpt4all import GPT4All
import json

# Receive all messages as JSON string
messages_json = sys.argv[1]
messages = json.loads(messages_json)

# Extract system prompt
system_prompt = ""
if messages and messages[0].get("role") == "system":
    system_prompt = messages[0]["content"]

# Build context
context = ""
if system_prompt:
    context += f"System: {system_prompt}\n"

for msg in messages:
    role = msg.get("role", "user")
    content = msg.get("content", "")
    if role != "system":
        context += f"{role.capitalize()}: {content}\n"

# Load GPT4All model
model = GPT4All("ggml-gpt4all-j-v1.3-groovy")

# Generate reply
reply = model.generate(context)
print(reply)
