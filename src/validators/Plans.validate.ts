import { JoiExtended } from ".";
import { FITNESS_GOALS } from "../contracts/enum/FitnessRelated.enum";

export const createUserPlanSchemaJoi = JoiExtended.object({
  id: JoiExtended.string().required().messages({
    "string.base": "ID must be a string",
    "any.required": "ID is a required field",
  }),
  name: JoiExtended.string().required().messages({
    "string.base": "Name must be a string",
    "any.required": "Name is a required field",
  }),
  description: JoiExtended.string().required().messages({
    "string.base": "Description must be a string",
    "any.required": "Description is a required field",
  }),
  goals: JoiExtended.array()
    .items(JoiExtended.string().valid(...Object.values(FITNESS_GOALS)))
    .optional(),
  durationInWeeks: JoiExtended.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Duration in weeks must be a number",
      "number.integer": "Duration in weeks must be an integer",
      "number.positive": "Duration in weeks must be a positive number",
      "any.required": "Duration in weeks is a required field",
    }),
  frequencyPerWeek: JoiExtended.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Frequency per week must be a number",
      "number.integer": "Frequency per week must be an integer",
      "number.positive": "Frequency per week must be a positive number",
      "any.required": "Frequency per week is a required field",
    }),
  restDaysPerWeek: JoiExtended.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Rest days per week must be a number",
      "number.integer": "Rest days per week must be an integer",
      "number.positive": "Rest days per week must be a positive number",
      "any.required": "Rest days per week is a required field",
    }),
  intensity: JoiExtended.string().required().messages({
    "string.base": "Intensity must be a string",
    "any.required": "Intensity is a required field",
  }),
  exercises: JoiExtended.array()
    .items(
      JoiExtended.object({
        name: JoiExtended.string().required().messages({
          "string.base": "Exercise name must be a string",
          "any.required": "Exercise name is a required field",
        }),
        description: JoiExtended.string().required().messages({
          "string.base": "Exercise description must be a string",
          "any.required": "Exercise description is a required field",
        }),
        sets: JoiExtended.number().integer().positive().required().messages({
          "number.base": "Sets must be a number",
          "number.integer": "Sets must be an integer",
          "number.positive": "Sets must be a positive number",
          "any.required": "Sets is a required field",
        }),
        repetitions: JoiExtended.number()
          .integer()
          .positive()
          .required()
          .messages({
            "number.base": "Repetitions must be a number",
            "number.integer": "Repetitions must be an integer",
            "number.positive": "Repetitions must be a positive number",
            "any.required": "Repetitions is a required field",
          }),
        restBetweenSetsInSeconds: JoiExtended.number()
          .integer()
          .positive()
          .required()
          .messages({
            "number.base": "Rest between sets must be a number",
            "number.integer": "Rest between sets must be an integer",
            "number.positive": "Rest between sets must be a positive number",
            "any.required": "Rest between sets is a required field",
          }),
        equipmentRequired: JoiExtended.array()
          .items(
            JoiExtended.object({
              name: JoiExtended.string().required().messages({
                "string.base": "Equipment name must be a string",
                "any.required": "Equipment name is a required field",
              }),
              description: JoiExtended.string().required().messages({
                "string.base": "Equipment description must be a string",
                "any.required": "Equipment description is a required field",
              }),
            })
          )
          .optional(),
      })
    )
    .required()
    .messages({
      "any.required": "Exercises are required",
    }),
  nutritionPlan: JoiExtended.object().optional(),
  createdBy: JoiExtended.string().required().messages({
    "string.base": "Created by must be a string",
    "any.required": "Created by is a required field",
  }),
});


export const exercisePlanDetailsSchemaJoi = JoiExtended.object({
})
export const addWorkoutToExercisePlanSchemaJoi = JoiExtended.object({
});
// export const editUserPlanSchemaJoi = JoiExtended.object({
//   name: JoiExtended.string().optional().messages({
//     "string.base": "Name must be a string",
//   }),
//   description: JoiExtended.string().optional().messages({
//     "string.base": "Description must be a string",
//   }),
//   goals: JoiExtended.array()
//     .items(JoiExtended.string().valid(...Object.values(FITNESS_GOALS)))
//     .optional()
//     .messages({
//       "array.base": "Goals must be an array",
//       "string.base": "Each goal must be a string",
//     }),
//   durationInWeeks: JoiExtended.number().integer().optional().messages({
//     "number.base": "Duration in weeks must be a number",
//     "number.integer": "Duration in weeks must be an integer",
//   }),
//   frequencyPerWeek: JoiExtended.number().integer().optional().messages({
//     "number.base": "Frequency per week must be a number",
//     "number.integer": "Frequency per week must be an integer",
//   }),
//   restDaysPerWeek: JoiExtended.number().integer().optional().messages({
//     "number.base": "Rest days per week must be a number",
//     "number.integer": "Rest days per week must be an integer",
//   }),
//   intensity: JoiExtended.string()
//     .valid(...Object.values(INTENSITY_LEVELS))
//     .optional()
//     .messages({
//       "string.base": "Intensity must be a string",
//     }),
//   exercises: JoiExtended.array()
//     .items(
//       JoiExtended.object({
//         name: JoiExtended.string().required().messages({
//           "string.base": "Exercise name must be a string",
//           "any.required": "Exercise name is a required field",
//         }),
//         sets: JoiExtended.number().integer().required().messages({
//           "number.base": "Sets must be a number",
//           "number.integer": "Sets must be an integer",
//           "any.required": "Sets is a required field",
//         }),
//         reps: JoiExtended.number().integer().required().messages({
//           "number.base": "Reps must be a number",
//           "number.integer": "Reps must be an integer",
//           "any.required": "Reps is a required field",
//         }),
//         restTime: JoiExtended.number().integer().required().messages({
//           "number.base": "Rest time must be a number",
//           "number.integer": "Rest time must be an integer",
//           "any.required": "Rest time is a required field",
//         }),
//       })
//     )
//     .optional()
//     .messages({
//       "array.base": "Exercises must be an array",
//     }),
//   nutritionPlan: JoiExtended.object({
//     calories: JoiExtended.number().optional().messages({
//       "number.base": "Calories must be a number",
//     }),
//     protein: JoiExtended.number().optional().messages({
//       "number.base": "Protein must be a number",
//     }),
//     carbs: JoiExtended.number().optional().messages({
//       "number.base": "Carbs must be a number",
//     }),
//     fats: JoiExtended.number().optional().messages({
//       "number.base": "Fats must be a number",
//     }),
//   })
//     .optional()
//     .messages({
//       "object.base": "Nutrition plan must be an object",
//     }),
// });
