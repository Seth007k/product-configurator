import { IsArray, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateVariantDto {
    @IsNotEmpty()
    productId: string;

    @IsArray()
    @ArrayMinSize(1)
    assignments: {
        baureihe: string;
        modelle: string[];
    }[];
}