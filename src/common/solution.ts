export interface Solution {
    first(input: string, options?: { [key: string]: unknown }): number;
    second(input: string, options?: { [key: string]: unknown }): number;
}
