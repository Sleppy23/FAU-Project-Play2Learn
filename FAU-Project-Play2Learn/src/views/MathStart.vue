<template>
  <div style="text-align: center;">
    <h1>Math Facts Practice</h1>

    <div style="margin-top: 1.5rem;">
      <label style="display: block; margin-bottom: 0.75rem;">
        Operation:
        <select v-model="operation" style="margin-left: 0.5rem;">
          <option v-for="op in operations" :key="op.value" :value="op.value">
            {{ op.label }}
          </option>
        </select>
      </label>

      <label style="display: block; margin-bottom: 0.75rem;">
        Max number:
        <input
          type="number"
          min="5"
          max="100"
          step="1"
          v-model.number="maxNumber"
          style="margin-left: 0.5rem; width: 90px;"
        />
      </label>

      <button @click="startGame" :disabled="!isValid" style="margin-top: 0.5rem;">
        Play!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MathStart',

  data() {
    return {
      operation: '+',
      maxNumber: 10,
      operations: [
        { label: 'Addition (+)', value: '+' },
        { label: 'Subtraction (−)', value: '-' },
        { label: 'Multiplication (×)', value: '*' },
        { label: 'Division (÷)', value: '/' },
      ],
    };
  },

  computed: {
    isValid() {
      return (
        ['+', '-', '*', '/'].includes(this.operation) &&
        Number.isFinite(this.maxNumber) &&
        this.maxNumber >= 5 &&
        this.maxNumber <= 100
      );
    },
  },

  methods: {
    startGame() {
      if (!this.isValid) return;

      this.$router.push({
        name: 'MathPlay',
        query: {
          op: this.operation,
          max: this.maxNumber,
        },
      });
    },
  },
};
</script>
