import { PermissionDto } from './permission.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResourcePermissionsDto {
  @ApiProperty({
    description: 'The ID of the resource',
    type: Number,
  })
  resourceId: number;

  @ApiProperty({
    description: 'The name of the resource',
    type: String,
  })
  resourceName: string;

  @ApiProperty({
    description: 'The permissions associated with this resource',
    type: [PermissionDto],
  })
  permissions: PermissionDto[];
}
