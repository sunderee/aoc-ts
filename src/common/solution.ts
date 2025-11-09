export interface Solution {
    first(input: string, options?: { [key: string]: unknown }): number | string;
    second(input: string, options?: { [key: string]: unknown }): number | string;
}
