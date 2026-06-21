const { AutoTokenizer, AutoModelForCausalLM } = require("@xenova/transformers");
const path = require("path");

let model = null;
let tokenizer = null;

async function loadModel() {
  if (model && tokenizer) {
    return { model, tokenizer };
  }

  const modelPath = process.env.LLM_MODEL_PATH || path.join(__dirname, "../models/gpt2");
  tokenizer = await AutoTokenizer.from_pretrained(modelPath);
  model = await AutoModelForCausalLM.from_pretrained(modelPath, {
    quantization: "int8",
  });
  return { model, tokenizer };
}

async function generateText(prompt, { maxTokens = 150, temperature = 0.7 } = {}) {
  try {
    const { model, tokenizer } = await loadModel();
    const output = await model.generate(
      prompt,
      {
        max_new_tokens: maxTokens,
        temperature,
      },
      tokenizer
    );

    return output.toString();
  } catch (error) {
    console.error("LLM generation failed, falling back to default:", error.message);
    return null;
  }
}

module.exports = {
  generateText,
};
