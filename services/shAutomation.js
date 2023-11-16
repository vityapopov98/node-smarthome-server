export const SHAutomation = (topic, payload, aedes) => {
  const automations = [
    {
      name: "Включение света по одному выключателю",
      automationConditions: [
        {
          firstOperandTopic: "SWH10001/setState",
          operator: "=",
          comparisonValue: "L:1;",
        },
      ],
      actions: [
        {
          topic: "SWH10002/setState",
          payload: "L:1;",
        },
      ],
    },
  ];

  const doActions = (actions) => {
    actions.forEach((action) => {
      console.log("doActions", action);
      // Публикуем в mqtt
      aedes.publish({
        cmd: "publish",
        qos: 2,
        topic: action.topic,
        payload: Buffer.from(`${action.payload}`),
        retain: false,
      });
    });
  };

  automations.forEach((automation) => {
    let isConditionSuccess = false;
    const automationConditionsResults = [];
    console.log("Запускаем автоматизацию", automation);
    automation.automationConditions.forEach((condition, index) => {
      console.log("Topic, payload ", topic, payload);
      if (condition.firstOperandTopic === topic) {
        if (condition.operator === "=") {
          console.log("Сравнение =");
          automationConditionsResults.push(
            payload === condition.comparisonValue
          );
        } else if (condition.operator === ">") {
          automationConditionsResults.push(payload > condition.comparisonValue);
        } else {
          automationConditionsResults.push(payload < condition.comparisonValue);
        }

        if (index + 1 === automation.automationConditions.length) {
          // Попадаем сюда при обработке последнего условия в автоматизации
          //Если все промежуточные условия сработали, то тут можно будет написать в результате итог
          isConditionSuccess =
            automationConditionsResults.indexOf(false) === -1; // Когда все true, то считаем что все условия выполнены

          console.log(
            "Последнее сравнили, будем запускать действия",
            isConditionSuccess
          );
          if (isConditionSuccess) {
            doActions(automation.actions);
          }
        }
      }
    });
  });
};
