import { IsNotEmpty, minLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @minLength(2)
    name: string;
}