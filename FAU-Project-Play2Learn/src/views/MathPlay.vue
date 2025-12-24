<template>
  <div style="text-align: center;">
    <h1>Math Facts Practice</h1>

    <div
      style="
        display: flex;
        justify-content: center;
        gap: 4rem;
        margin-top: 1rem;
      "
    >
      <p><strong>Score:</strong> {{ score }}</p>
      <p><strong>Time Left:</strong> {{ timeLeft }}</p>
    </div>

    <div style="margin-top: 1.5rem;">
      <h2 style="margin: 0;">
        {{ questionText }}
      </h2>

      <div style="margin-top: 1rem;">
        <label>
          Answer:
          <input
            type="number"
            v-model="playerAnswer"
            @keyup.enter="submitAnswer"
            style="margin-left: 0.5rem; width: 120px;"
          />
        </label>

        <button
          @click="submitAnswer"
          :disabled="String(playerAnswer).trim() === ''"
          style="margin-left: 0.5rem;"
        >
          Submit
        </button>
      </div>

      <p v-if="feedback" style="margin-top: 1rem;">
        {{ feedback }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MathPlay',

  data() {
    return {
      operation: '+',
      maxNumber: 10,

      timeLeft: 60,
      timerId: null,

      score: 0,

      a: 0,
      b: 0,
      correctAnswer: null,

      playerAnswer: '',
      feedback: '',
    };
  },

  computed: {
    questionText() {
      const symbol = this.operation === '*' ? '×' : this.operation === '/' ? '÷' : this.operation;
      return `${this.a} ${symbol} ${this.b} = ?`;
    },
  },

  created() {
    const op = this.$route.query.op;
    const max = Number(this.$route.query.max);

    this.operation = ['+', '-', '*', '/'].includes(op) ? op : '+';
    this.maxNumber = Number.isFinite(max) && max >= 5 ? max : 10;

    this.newQuestion();
    this.startTimer();
  },

  beforeUnmount() {
    this.stopTimer();
  },

  methods: {
    startTimer() {
      this.stopTimer();

      this.timerId = setInterval(() => {
        this.timeLeft -= 1;

        if (this.timeLeft <= 0) {
          this.timeLeft = 0;
          this.stopTimer();
          this.endGame();
        }
      }, 1000);
    },

    stopTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },

    randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    newQuestion() {
      this.feedback = '';

      if (this.operation === '+') {
        this.a = this.randInt(0, this.maxNumber);
        this.b = this.randInt(0, this.maxNumber);
        this.correctAnswer = this.a + this.b;
      }

      if (this.operation === '-') {
        const x = this.randInt(0, this.maxNumber);
        const y = this.randInt(0, this.maxNumber);
        this.a = Math.max(x, y);
        this.b = Math.min(x, y);
        this.correctAnswer = this.a - this.b;
      }

      if (this.operation === '*') {
        this.a = this.randInt(0, this.maxNumber);
        this.b = this.randInt(0, this.maxNumber);
        this.correctAnswer = this.a * this.b;
      }

      if (this.operation === '/') {
        const divisor = this.randInt(1, this.maxNumber);
        const quotient = this.randInt(0, this.maxNumber);
        const dividend = divisor * quotient;

        this.a = dividend;
        this.b = divisor;
        this.correctAnswer = quotient;
      }

      this.playerAnswer = '';
    },

    submitAnswer() {
      const raw = String(this.playerAnswer).trim();
      if (raw === '') {
        this.feedback = 'Type an answer first.';
        return;
      }

      const numeric = Number(raw);
      if (!Number.isFinite(numeric)) {
        this.feedback = 'Please enter a valid number.';
        return;
      }

      if (numeric === this.correctAnswer) {
        this.score += 1;
        this.feedback = 'Correct!';
        this.newQuestion();
      } else {
        this.feedback = `Not quite. Try again.`;
      }
    },

    endGame() {
      this.$router.push({
        name: 'MathGameOver',
        query: {
          score: this.score,
          op: this.operation,
          max: this.maxNumber,
        },
      });
    },
  },
};
</script>
