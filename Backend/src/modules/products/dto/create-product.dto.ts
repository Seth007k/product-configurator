import { IsNotEmpty, MinLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @MinLength(2)
    name: string;
}