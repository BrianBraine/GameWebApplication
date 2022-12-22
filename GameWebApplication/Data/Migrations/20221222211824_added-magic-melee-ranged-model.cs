using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameWebApplication.Data.Migrations
{
    public partial class addedmagicmeleerangedmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MagicMeleeRanged",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Win = table.Column<bool>(type: "bit", nullable: false),
                    Loss = table.Column<bool>(type: "bit", nullable: false),
                    Tie = table.Column<bool>(type: "bit", nullable: false),
                    UserChoice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ComputerChoice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TimeToChoice = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MagicMeleeRanged", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MagicMeleeRanged");
        }
    }
}
