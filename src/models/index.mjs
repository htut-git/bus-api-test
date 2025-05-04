import { readdirSync } from 'fs';

const models = {};

const files = readdirSync(new URL('.', import.meta.url))
    .filter(file => file.endsWith('Model.mjs'));

for (const file of files) {
    const module = await import(`./${file}`);
    const model = module.default;
    models[model.name] = model;
}

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

export default models;