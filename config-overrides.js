import rewireMobx from "react-app-rewire-mobx";

export default (config, env) => {
    config = rewireMobx(config, env);

    return config;
}
