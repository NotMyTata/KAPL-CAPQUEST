import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    roots: ['<rootDir>'],
    testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
};

export default config;