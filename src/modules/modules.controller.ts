// modules.controller.ts
@Post()
create(@Body() createModuleDto: CreateModuleDto) {
  return this.modulesService.create(createModuleDto);
}
