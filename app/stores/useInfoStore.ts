import moment from 'moment'

/**
 * A Pinia store for managing user information.
 *
 * @store useInfoStore
 *
 * @remarks
 * This store holds basic user data such as name, birthday, and gender. It also
 * provides getters for retrieving specific user information, like the name and
 * a relative time describing the user’s age.
 *
 * @state
 * @property {string} name - The user’s full name.
 * @property {string} title - The user’s job title.
 * @property {string} birthday - The user’s birthday in YYYY-MM-DD format.
 * @property {string} gender - The user’s gender.
 * @property {string} address - The user’s address.
 * @property {object} description - A brief description of the user.
 * @property {string} introduction - A detailed introduction about the user.
 * @property {Array<{ key: string; label: string; level: 'Beginner' | 'Intermediate' | 'Expert' }> } skills - The user’s skills.
 *
 * @getters
 * @method getName - Returns the user’s name.
 * @method getTitle - Returns the user’s job title.
 * @method getAge - Returns a relative time string indicating the user’s age.
 * @method getGender - Returns the user’s gender.
 * @method getAddress - Returns the user’s address.
 * @method getDescribing - Returns the user’s description.
 */
export const useInfoStore = defineStore('info', {
  state: () => ({
    name: 'Leo Hu',
    title: 'Developer',
    birthday: '1997-11-29',
    gender: 'male',
    address: 'Hong Kong',
    describing: {
      prefix: 'I am a passionate developer who enjoys ',
      words: [
        {
          key: 'programming',
          label: 'Programming',
          color: 'text-gray-500',
        },
        {
          key: 'reading',
          label: 'Reading',
          color: 'text-sky-500',
        },
        {
          key: 'traveling',
          label: 'Traveling',
          color: 'text-yellow-500',
        },
        {
          key: 'music',
          label: 'Music',
          color: 'text-purple-500',
        },
        {
          key: 'gaming',
          label: 'Gaming',
          color: 'text-green-500',
        },
      ],
      suffix: ' and I strive to make a positive impact through technology and innovation.',
    },
    introduction:
      'As a developer, I am dedicated to creating efficient and innovative solutions that enhance user experiences. With a strong foundation in various programming languages and frameworks, I continuously seek to expand my knowledge and stay updated with the latest industry trends.',
    skills: [
      {
        key: 'aws',
        label: 'AWS',
        level: 'Intermediate',
      },
      {
        key: 'docker',
        label: 'Docker',
        level: 'Intermediate',
      },
      {
        key: 'figma',
        label: 'Figma',
        level: 'Intermediate',
      },
      {
        key: 'flutter',
        label: 'Flutter',
        level: 'Intermediate',
      },
      {
        key: 'gitlab',
        label: 'GitLab',
        level: 'Intermediate',
      },
      {
        key: 'javascript',
        label: 'JavaScript',
        level: 'Intermediate',
      },
      {
        key: 'laravel',
        label: 'Laravel',
        level: 'Expert',
      },
      {
        key: 'n8n',
        label: 'n8n',
        level: 'Intermediate',
      },
      {
        key: 'nextjs',
        label: 'Next.js',
        level: 'Intermediate',
      },
      {
        key: 'nginx',
        label: 'Nginx',
        level: 'Intermediate',
      },
      {
        key: 'nuxtjs',
        label: 'Nuxt.js',
        level: 'Expert',
      },
      {
        key: 'php',
        label: 'PHP',
        level: 'Expert',
      },
      {
        key: 'react',
        label: 'React',
        level: 'Intermediate',
      },
      {
        key: 'typescript',
        label: 'TypeScript',
        level: 'Intermediate',
      },
      {
        key: 'vue',
        label: 'Vue.js',
        level: 'Expert',
      },
    ],
  }),
  getters: {
    getName: (state) => state.name,
    getUpperCaseName: (state) => state.name.toUpperCase(),
    getTitle: (state) => state.title,
    getAge: (state) => moment().diff(moment(state.birthday, 'YYYY-MM-DD'), 'years'),
    getGender: (state) => state.gender,
    getAddress: (state) => state.address,
    getDescribing: (state) => state.describing,
    getIntroduction: (state) => state.introduction,
    getSkillList: (state) => state.skills.map((skill) => skill.key),
    getSkills: (state) => state.skills,
  },
  actions: {
    /**
     * Find a skill by its key
     */
    findSkillByKey(key: string) {
      return this.getSkills.find((skill) => skill.key === key)
    },
  },
})
