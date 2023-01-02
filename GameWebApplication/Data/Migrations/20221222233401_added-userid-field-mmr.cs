using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameWebApplication.Data.Migrations
{
    public partial class addeduseridfieldmmr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "MagicMeleeRanged",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "MagicMeleeRanged");
        }
    }
}
